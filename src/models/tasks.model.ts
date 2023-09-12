export interface TasksModel {
  id_text?: string;
  title: string;
  description: string;
  done?:boolean|number;
  created_at?:Date|string;
  updated_at?:Date|string;
}
