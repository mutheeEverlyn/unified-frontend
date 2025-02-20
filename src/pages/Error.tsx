import { Link, useRouteError } from "react-router-dom";

import {ArrowLeft} from 'lucide-react'

function Error() {
const error : any = useRouteError()

  return (
    <div className="py-20  bg:base-100">
    <div className="text-center">
        <p className="text-base font-semibold text-red-500">ERROR</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-green-300 sm:text-5xl">
            Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
            Sorry, we could not find the page you're looking for.
        </p>
        <p>
            {error.statusText || error.message}
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-3">
            <Link to="/" className="rounded-md inline-flex items-center bg-gray-400 hover:bg-amber-300 p-1 btn-sm btn-info text-sm font-semibold"><ArrowLeft size={16} className="mr-2" />Home
            </Link>
            <Link to="/contactUs" className="rounded-md btn p-1 bg-amber-300  hover:bg-gray-400 btn-sm  text-sm font-semibold"> Contact us
            </Link>
        </div>
    </div>
</div>
  )
}

export default Error