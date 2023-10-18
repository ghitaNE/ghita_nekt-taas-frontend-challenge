import moment from 'moment'

export function formatCreatedAt(createdAt: string): string {
  return moment(createdAt).format('MMMM DD, YYYY')
}
