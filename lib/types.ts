export interface Company {
  name: string;
  logo?: string;
  description?: string;
}

export interface Job {
  id: number;
  title: string;
  company: Company;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  skills: string[];
  description?: string;
  status?: string;
}

export interface TodoLane {
  id: string;
  title: string;
  jobIds: number[];
}