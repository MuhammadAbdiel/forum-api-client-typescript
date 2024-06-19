export type Action = {
  SET_IS_PRELOAD: string
}

export type SetIsPreload = {
  type: string
  payload: {
    isPreload: boolean
  }
}
