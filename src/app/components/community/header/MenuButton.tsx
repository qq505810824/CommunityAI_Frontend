import { Menu, Transition } from '@headlessui/react';
import {
    ArrowRightOnRectangleIcon,
    Cog6ToothIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

function MenuButton(props: any) {
    const router = useRouter();
    return (
        <Menu as="div" className="relative">
            <div className="flex items-center">
                <Menu.Button className="rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    {props?.avatar ? (
                        <img className=" rounded-full w-10 h-10" src={props?.avatar} alt="" />
                    ) : (
                        <UserCircleIcon
                            className="w-10 h-10 text-gray-500 hover:text-gray-700"
                            aria-hidden="true"
                        />
                    )}
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-1 min-w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col gap-1 py-1">
                    <div className="px-1">
                        <Menu.Item>
                            <div className="flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-400">
                                <UserCircleIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                                {props?.email || 'Loading...'}
                            </div>
                        </Menu.Item>
                    </div>
                    <div className="px-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active ? 'bg-violet-100 text-violet-800' : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={() => {
                                        router.push('/profile');
                                    }}
                                >
                                    <Cog6ToothIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                                    Profile Settings
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="px-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active ? 'bg-red-200 text-red-800' : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={() => {
                                        props?.logout && props?.logout();
                                    }}
                                >
                                    <ArrowRightOnRectangleIcon
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    Logout
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default MenuButton;
