import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ModelDropDownProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export const ModelDropDown: React.FC<ModelDropDownProps> = ({
  selectedModel,
  setSelectedModel,
}) => {
  const models = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'gpt-4o', 'gpt-4o-mini'];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center gap-1 rounded-lg bg-slate-800 py-2 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/20 focus:outline-none data-[hover]:bg-slate-700 data-[open]:bg-slate-700 data-[focus]:outline-1 data-[focus]:outline-white">
          <span>{selectedModel.toUpperCase()}</span>
          <ChevronDownIcon className="w-5 h-5 -mr-1" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute mt-2 w-56 rounded-lg shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-0">
            {models.map((model) => (
              <Menu.Item key={model}>
                {({ active }) => (
                  <button
                    onClick={() => setSelectedModel(model)}
                    className={classNames(
                      active ? 'bg-slate-700 text-white font-bold rounded' : 'text-zinc-400',
                      'block w-full text-left px-4 py-2 text-sm'
                    )}
                  >
                    {model.toUpperCase()}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
