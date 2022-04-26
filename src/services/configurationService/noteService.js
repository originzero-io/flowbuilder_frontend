import ConfigurationService from '.';

class NoteService extends ConfigurationService{
   async getNotes(workspace) {
      const response = await this.service.get(`/notes/byWorkspace/${workspace._id}`);
      return response.data;
   }
}

export default new NoteService();