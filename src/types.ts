export type Client = {
  id: number;
  href: string;
  name: string;
  modifiedAt: Date;
  createdAt: Date;
}

export type NewClient =
  Omit<Client, 'id' | 'href' | 'modifiedAt' | 'createdAt'>;

export type Project = {
  id: number;
  href: string;
  name: string;
  client: Client;
  modifiedAt: Date;
  createdAt: Date;
}

export type NewProject =
  Omit<Project, 'id' | 'href' | 'modifiedAt' | 'createdAt'>;

export type Person = {
  id: number;
  href: string;
  name: string;
  modifiedAt: Date;
  createdAt: Date;
  principalUri: string | null;
}

export type NewPerson =
  Omit<Person, 'id' | 'href' | 'modifiedAt' | 'createdAt'>;

export type Entry = {
  id: number;
  href: string;
  /**
   * Formatted like YYYY-MM-DD
   */
  date: string;
  minutes: number;

  description: string;

  person: Person;
  project: Project;

  billable: boolean;

  modifiedAt: Date;
  createdAt: Date;

}

export type NewEntry =
  Omit<Entry, 'id' | 'href' | 'modifiedAt' | 'createdAt'>;
