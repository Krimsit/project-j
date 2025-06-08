import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Project } from '@models'

import { FilesService } from './file.service'

import type { ProjectDocument } from '@models'

export type CreateProjectParams = Pick<Project, 'name' | 'description'> & {
  owner: string
  cover?: string
}

export type UpdateProjectParams = Partial<
  Omit<CreateProjectParams, 'owner'>
> & {
  id: string
}

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @Inject(FilesService) private readonly filesService: FilesService,
  ) {}

  async findById(id: string): Promise<ProjectDocument | null> {
    return this.projectModel.findById(id).populate(['owner', 'cover']).exec()
  }

  async getUserProjects(userId: string): Promise<ProjectDocument[]> {
    return this.projectModel
      .find({ owner: userId })
      .populate(['owner', 'cover'])
      .exec()
  }

  async createProject(
    params: CreateProjectParams,
  ): Promise<ProjectDocument | null> {
    const gradient = this.generateNotionStyleGradient()
    const createdProject = new this.projectModel({
      ...params,
      gradient,
    })

    return createdProject.save()
  }

  async updateProject({
    id,
    ...params
  }: UpdateProjectParams): Promise<ProjectDocument | null> {
    return this.projectModel.findByIdAndUpdate(
      id,
      {
        ...params,
      },
      {
        new: true,
      },
    )
  }

  async deleteProject(id: string): Promise<ProjectDocument | null> {
    return this.projectModel.findByIdAndDelete(id)
  }

  private getRandomPastelColor(): string {
    const hue = Math.floor(Math.random() * 360)
    const saturation = 60 + Math.random() * 20 // 60-80%
    const lightness = 75 + Math.random() * 10 // 75-85%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  private generateNotionStyleGradient(): string {
    const angle = Math.floor(Math.random() * 360)
    const colors = [this.getRandomPastelColor(), this.getRandomPastelColor()]

    return `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`
  }

  async deleteUnusedFiles() {
    const allUserFiles = (await this.projectModel.distinct('cover', {
      avatar: { $ne: null },
    })) as Types.ObjectId[]
    const usedFiles = await this.filesService.findAllUnusedFiles(allUserFiles)

    for (const unusedFileId of usedFiles) {
      await this.filesService.markFileForDeletion(unusedFileId.id)
    }
  }
}
