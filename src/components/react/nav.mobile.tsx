import { Popover, Transition } from "@headlessui/react";
import type { CollectionEntry } from "astro:content";
import { Fragment } from "react";
import { LuAlignJustify, LuX } from "react-icons/lu";

type Props = {
  toggle?: React.ReactNode;
  link?: React.ReactNode;
  routes: CollectionEntry<"routes">[];
};

function MobileNavigation(props: Props) {
  return (
    <Popover as="nav" className="flex md:hidden">
      <div className="flex items-center">
        <Popover.Button className="ml-auto ring-1 ring-zinc-900/5 backdrop-blur dark:ring-white/10 dark:hover:ring-white/20">
          <span className="sr-only">Menu</span>
          <LuAlignJustify className="stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
        </Popover.Button>

        <Transition.Root>
          <Transition.Child
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel
              className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
              focus
            >
              <div className="flex flex-row-reverse items-center justify-between">
                <Popover.Button aria-label="Close menu" className="-m-1 p-1">
                  <LuX className="size-6 text-zinc-500 dark:text-zinc-400" />
                </Popover.Button>
                <h4 className="text-lg font-bold">Navigation</h4>
              </div>

              <div className="mt-6">
                <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                  {props.routes.map((route) => (
                    <Popover.Button
                      as="a"
                      href={route.data.href}
                      key={`mobile-${route.data.href}`}
                      className="block py-2 capitalize"
                      data-astro-prefetch="hover"
                    >
                      {route.data.text}
                    </Popover.Button>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <label htmlFor="theme-switch">Switch theme</label>
                  {props.toggle}
                </div>
              </div>
            </Popover.Panel>
          </Transition.Child>
        </Transition.Root>
      </div>
    </Popover>
  );
}

export default MobileNavigation;