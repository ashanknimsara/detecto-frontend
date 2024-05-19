import { Link, NavLink } from 'react-router-dom';

interface SubRoutesBarProps {
  routes: Array<any>;
}

const SubRoutesBar = ({ routes }: SubRoutesBarProps) => {
  return (
    <div className="flex h-screen flex-1 flex-col justify-between ">
      <div className="px-4 py-6">
        <ul className="mt-14 space-y-1">
          {routes.map((route, index) => (
            <li key={index}>
              <Link
                to={route.to}
                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubRoutesBar;
