import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User } from '../models'

import type { UserInput, UserDocument } from '../models'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec()
  }

  async create(test: UserInput): Promise<User> {
    const newUser = new this.userModel(test)

    return await newUser.save()
  }

  async update(id: string, test: UserInput): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, test, { new: true }).exec()
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec()
  }
}
