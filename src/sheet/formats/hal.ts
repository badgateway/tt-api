import { HalResource, HalLink } from 'hal-types';
import { Person, Entry } from '../../types';
import { DateTime } from 'luxon';

export function collection(person: Person): HalResource<any> {

  const items: HalLink[] = [];

  const start = DateTime.now().startOf('week');
  let current = start;

  for(let idx = 0; idx < 25; idx++) {

    const startText = `${current.monthLong} ${current.day}`;

    const lastDayOfWeek = current.plus({days: 6});
    const endText = `${lastDayOfWeek.monthLong} ${lastDayOfWeek.day}`;

    items.push({
      href: person.href + `/sheet/${current.year}/${current.weekNumber}`,
      title: `${startText} - ${endText}, ${current.year}`
    });
    current = current.minus({week: 1});

  }


  return {

    _links: {
      self: {
        href: person.href + '/sheet',
        title: `Sheets for ${person.name}`,
      },
      item: items,

    }

  };

}


export function item(person: Person, year: number, weekNum: number, entries: Entry[]): HalResource<any> {

  const startDate = DateTime.fromObject({
    weekYear: year,
    weekNumber: weekNum,
  }).startOf('week');
  const endDate = startDate.plus({days: 6});

  return {
    year,
    weekNum,

    startDate: startDate.toISODate(),
    endDate: endDate.toISODate(),

    _links: {
      self: {
        href: `${person.href}/sheet/${year}/${weekNum}`,
        title: `Week ${weekNum}, ${year}`,
      },
      collection: {
        href: `${person.href}/sheet`,
        title: 'List of sheets',
      },
      person: {
        href: person.href,
        title: person.name
      },
      entry: entries.map( entry => ({
        href: entry.href,
        title: entry.description,
      }))
    },


  };

}
