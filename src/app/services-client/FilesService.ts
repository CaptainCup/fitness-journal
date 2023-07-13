import BaseHttpService from './BaseHttpService'

class FilesService extends BaseHttpService {
  async upload(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)

    return this.post('/files/', formData)
  }
}

export default FilesService
