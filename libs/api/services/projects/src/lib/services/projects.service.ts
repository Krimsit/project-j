import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { FirebaseService } from '@api/firebase'
import { User } from '@api/user'
import { projectValidationSchema } from '@shared/validations'

import { Project } from '../models'

import type {
  ProjectDocument,
  ProjectForm,
  UpdateProjectUsersForm,
} from '../models'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async getUserProjects(user: User): Promise<Project[]> {
    return await this.projectModel
      .find({
        $or: [{ users: new Types.ObjectId(user._id) }, { owner: user }],
      })
      .populate({ path: 'owner', model: User.name })
      .exec()
  }

  async create(data: ProjectForm, user: User): Promise<Project> {
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

    return await createdProject.save()
  }

  async update(data: ProjectForm, projectId: string): Promise<Project> {
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

    return project
  }

  async updateUsers(data: UpdateProjectUsersForm): Promise<Project> {
    const project = await this.projectModel
      .findByIdAndUpdate(
        data.project_id,
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

    return project
  }

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

  async delete(projectId: string): Promise<boolean> {
    const result = await this.projectModel.findByIdAndDelete(projectId).exec()

    if (!result) {
      throw new BadRequestException('Errors occurred when deleting the project')
    }

    return true
  }
}
