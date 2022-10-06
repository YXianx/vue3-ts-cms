interface IAccount {
  username: string
  password: string
}

interface ILoginData {
  id: number
  name: string
  token: string
}

interface IDataType<T = any> {
  code: number
  data: T
}

export { IAccount, ILoginData, IDataType }
