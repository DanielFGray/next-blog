// import Link from 'next/link'

const projects = [
  {
    name: 'Workcation',
    imageUrl: '',
  },
  {
    name: 'Workcation',
    imageUrl: ''
  },
]

const activityItems = [
  {
    id: 1,
    project: projects[0],
    commit: '2d89f0c8',
    branch: 'production',
    time: '1h',
  },
  {
    id: 2,
    project: projects[0],
    commit: 'a62320f6',
    environment: 'development',
    time: '1h',
  },
  {
    id: 3,
    project: projects[0],
    commit: 'a62320f6',
    environment: 'development',
    time: '1h',
  },
]

export default function Example(): JSX.Element {
  return (
    <ul className="divide-y divide-gray-200">
      {activityItems.map(activityItem => (
        <li key={activityItem.id} className="py-4">
          <div className="flex space-x-3">
            {activityItem.project.imageUrl && (
              <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-500 rounded-full">
                <span className="text-sm font-medium leading-none text-white">
                  {activityItem.project.imageUrl}
                </span>
              </span>
            )}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{activityItem.project.name}</h3>
                <p className="text-sm text-gray-500">{activityItem.time}</p>
              </div>
              <p className="text-sm text-gray-500">
                Deployed {activityItem.project.name} ({activityItem.commit} in master) to{' '}
                {activityItem.branch}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
