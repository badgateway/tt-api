export type Client = {
  id: number;
  href: string;
  name: string;
  modifiedAt: Date,
  createdAt: Date,
}

export type NewClient =
  Omit<Client, 'id' | 'href' | 'modifiedAt' | 'createdAt'>;

export type Project = {
  id: number;
  name: string;
  client: Client;
}

export type Person = {
  id: number;
  name: string;
}

export type Entry = {
  id: number;
  /**
   * Formatted like YYYY-MM-DD
   */
  date: string;

  minutes: number;

  person: Person;
  project: Project

}
