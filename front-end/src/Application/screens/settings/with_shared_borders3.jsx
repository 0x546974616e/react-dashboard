import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { LuBarChartBig, LuInfo, LuMedal } from "react-icons/lu";

const stats = [
  { name: 'Total Subscribers', stat: '71,897', previousStat: '70,946', change: '12%', changeType: 'increase' },
  { name: 'Avg. Open Rate', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
  { name: 'Avg. Click Rate', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example3() {
return (
  <div>
    <h3 className="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>
    <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
      {stats.map((item, index) => (
        <div key={item.name} className="px-4 py-5 sm:p-6 cursor-pointer">
          <dt className="text-base font-normal text-gray-400">
            <div className="flex flex-row items-center gap-2">
              <span className="text-gray-900">{item.name}</span>
              {index % 2 == 0 && <LuBarChartBig/>}
              {index >= 1 && <LuMedal/>}
              {index >= 1 && <LuInfo/>}
            </div>
          </dt>
          <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex items-baseline text-xl font-semibold text-indigo-600">
              <span>{item.stat}</span>

                <span
                  className={classNames(
                    item.changeType === 'increase' ? 'text-green-500' : 'text-red-500',
                    'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                  )}
                >
                  {item.changeType === 'increase' ? (
                    <ArrowUpIcon
                      className="mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                  {item.change}
                </span>
              </div>

              <div className="flex items-baseline text-xl font-semibold text-indigo-300">
                {item.previousStat}
              </div>
              {/* <span className="ml-2 text-sm font-medium text-gray-500">from {item.previousStat}</span> */}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
