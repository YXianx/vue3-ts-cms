// 设计接口明确指定state的类型，当值胡乱赋值
import type { ILoginState } from './login/types'
interface IRootState {
  name: string
  num: number
}

interface IRootWithModule {
  login: ILoginState
}

type IStoreType = IRootState & IRootWithModule

export { IRootState, IStoreType }
