import { Inject, Injectable } from '@nestjs/common'
import { FirebaseApp } from 'firebase/app'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { v4 } from 'uuid'

import type { FirebaseStorage } from 'firebase/storage'

@Injectable()
export class FirebaseService {
  private store: FirebaseStorage

  constructor(
    @Inject('FIREBASE_APP') private readonly firebaseApp: FirebaseApp,
  ) {
    this.store = getStorage(firebaseApp)
  }

  async uploadFile(base64: string, filename: string): Promise<string> {
    const fileName = `${filename}_${v4()}`
    const bytesArray = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
    const storageRef = ref(this.store, fileName)
    const uploadTask = await uploadBytesResumable(storageRef, bytesArray, {
      contentType: 'image/jpeg',
    })

    return await getDownloadURL(uploadTask.ref)
  }
}
