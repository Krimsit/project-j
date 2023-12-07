import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { FirebaseService } from '@api/firebase'
import { TasksService } from '@api/tasks'
import { Project, User } from '@api/models'
import { projectValidationSchema } from '@shared/validations'

import type {
  ProjectForm,
  ProjectResponse,
  UpdateProjectUsersForm,
} from '../models'
import type { ProjectDocument } from '../types'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    private readonly firebaseService: FirebaseService,
    private readonly tasksService: TasksService,
  ) {}

  async findById(projectId: string): Promise<ProjectDocument> {
    const project = await this.projectModel
      .findById(projectId)
      .populate({
        path: 'owner',
        model: User.name,
      })
      .populate({ path: 'users', model: User.name })
      .exec()

    if (!project) {
      throw new NotFoundException('Project not found')
    }

    return project
  }

  async getUserProjects(user: User): Promise<ProjectResponse[]> {
    const projects = await this.projectModel
      .find({
        $or: [{ users: new Types.ObjectId(user._id) }, { owner: user }],
      })
      .populate({ path: 'owner', model: User.name })
      .exec()

    return await Promise.all(
      projects.map((project) => this.parseProject(project)),
    )
  }

  async getById(projectId: string): Promise<ProjectResponse> {
    const project = await this.findById(projectId)

    return await this.parseProject(project)
  }

  async create(data: ProjectForm, user: User): Promise<ProjectResponse> {
    const validationResult = projectValidationSchema.safeParse(data)

    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error)
    }

    const imageUrl = await this.firebaseService.uploadFile(
      data.image.base64,
      data.image.filename,
    )
    const createdProject = new this.projectModel({
      ...data,
      image: imageUrl,
      owner: user._id,
    })

    await createdProject.populate({
      path: 'owner',
      model: User.name,
    })
    await createdProject.populate({ path: 'users', model: User.name })

    const project = await createdProject.save()

    return await this.parseProject(project)
  }

  async update(data: ProjectForm, projectId: string): Promise<ProjectResponse> {
    const validationResult = projectValidationSchema.safeParse(data)

    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error)
    }

    const project = await this.findById(projectId)
    const imageUrl =
      project.image === data.image.base64
        ? data.image.base64
        : await this.firebaseService.uploadFile(
            data.image.base64,
            data.image.filename,
          )

    await project
      .updateOne(
        {
          ...data,
          image: imageUrl,
        },
        {
          new: true,
        },
      )
      .exec()

    if (!project) {
      throw new BadRequestException('Errors occurred when updating the project')
    }

    return await this.parseProject(project)
  }

  async updateUsers(
    data: UpdateProjectUsersForm,
    projectId: string,
  ): Promise<ProjectResponse> {
    const project = await this.projectModel
      .findByIdAndUpdate(
        projectId,
        { users: data.users },
        {
          new: true,
        },
      )
      .populate({
        path: 'owner',
        model: User.name,
      })
      .populate({ path: 'users', model: User.name })
      .exec()

    if (!project) {
      throw new BadRequestException('Errors occurred when updating the project')
    }

    return await this.parseProject(project)
  }

  async delete(projectId: string): Promise<boolean> {
    const result = await this.projectModel.findByIdAndDelete(projectId).exec()

    if (!result) {
      throw new BadRequestException('Errors occurred when deleting the project')
    }

    return true
  }

  async parseProject(project: ProjectDocument): Promise<ProjectResponse> {
    const allTasksCount = await this.tasksService.getProjectTaskCount(
      String(project._id),
    )
    const completedTasksCount =
      await this.tasksService.getProjectCompletedTaskCount(String(project._id))

    return {
      _id: String(project._id),
      image: project.image,
      name: project.name,
      owner: project.owner,
      users: project.users,
      createdAt: project.createdAt,
      allTasksCount,
      completedTasksCount,
    }
  }
}
