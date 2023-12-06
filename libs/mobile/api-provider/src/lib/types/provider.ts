export enum ApiActions {
  Set = 'Set',
  Delete = 'Delete',
}

export type ApiData = {
  apiUri: string
  isLoading: boolean
}

export type ApiAction =
  | {
      type: ApiActions.Set
      uri: string
    }
  | {
      type: ApiActions.Delete
    }
