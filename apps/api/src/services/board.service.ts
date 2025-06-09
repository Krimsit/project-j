import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Board } from '@models'

import type { BoardDocument } from '@models'

export type CreateBoardParams = Pick<Board, 'name' | 'description'> & {
  project: string
  owner: string
}

export type UpdateBoardParams = Partial<Omit<CreateBoardParams, 'owner'>> & {
  id: string
}

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board.name) private boardModel: Model<Board>) {}

  async findById(id: string): Promise<BoardDocument | null> {
    return this.boardModel.findById(id).populate(['owner']).exec()
  }

  async getProjectBoards(projectId: string): Promise<BoardDocument[]> {
    return this.boardModel
      .find({ project: projectId })
      .populate(['owner'])
      .exec()
  }

  async createBoard(params: CreateBoardParams): Promise<BoardDocument | null> {
    const createdBoard = new this.boardModel(params)

    return createdBoard.save()
  }

  async updateBoard({
    id,
    ...params
  }: UpdateBoardParams): Promise<BoardDocument | null> {
    return this.boardModel.findByIdAndUpdate(
      id,
      {
        ...params,
      },
      {
        new: true,
      },
    )
  }

  async deleteBoard(id: string): Promise<BoardDocument | null> {
    return this.boardModel.findByIdAndDelete(id)
  }
}
