import React from 'react';
import { Listbox, Transition } from '@headlessui/react';

interface StyleSelectorProps {
  artStyle: string;
  setArtStyle: (style: string) => void;
  aspectRatio: string;
  setAspectRatio: (ratio: string) => void;
}

const artStyles = [
  { id: 'roblox-2022', name: 'Modern Roblox (2022+)' },
  { id: 'roblox-2016', name: 'Classic Roblox (2016)' },
  { id: 'cartoon', name: 'Cartoonish' },
  { id: 'anime', name: 'Anime' },
];

const aspectRatios = [
  { id: '1:1', name: 'Square (1:1)' },
  { id: '16:9', name: 'Widescreen (16:9)' },
  { id: '4:3', name: 'Standard (4:3)' },
  { id: '9:16', name: 'Vertical (9:16)' },
];

const StyleSelector: React.FC<StyleSelectorProps> = ({ artStyle, setArtStyle, aspectRatio, setAspectRatio }) => {
  const selectedStyle = artStyles.find(s => s.id === artStyle) || artStyles[0];
  const selectedRatio = aspectRatios.find(r => r.id === aspectRatio) || aspectRatios[0];

  return (
    <div>
      <div className="mb-4">
        <Listbox value={artStyle} onChange={setArtStyle}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-300 mb-2">Art Style</Listbox.Label>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-700 border border-gray-600 py-2 pl-3 pr-10 text-left text-white shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm">
                  <span className="block truncate">{selectedStyle.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a.75.75 0 01.53.22l3.5 3.5a.75.75 0 01-1.06 1.06L10 4.81 6.53 8.28a.75.75 0 01-1.06-1.06l3.5-3.5A.75.75 0 0110 3zM10 17a.75.75 0 01-.53-.22l-3.5-3.5a.75.75 0 011.06-1.06L10 15.19l3.47-3.47a.75.75 0 011.06 1.06l-3.5 3.5A.75.75 0 0110 17z" clipRule="evenodd" /></svg>
                  </span>
                </Listbox.Button>
                <Transition show={open} as={React.Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {artStyles.map((style) => (
                      <Listbox.Option key={style.id} className={({ active }) => `${active ? 'bg-purple-600 text-white' : 'text-gray-300'} relative cursor-default select-none py-2 pl-3 pr-9`} value={style.id}>
                        {({ selected, active }) => (
                          <>
                            <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>{style.name}</span>
                            {selected && (
                              <span className={`${active ? 'text-white' : 'text-purple-500'} absolute inset-y-0 right-0 flex items-center pr-4`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>

      <div className="mb-4">
        <Listbox value={aspectRatio} onChange={setAspectRatio}>
           {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-300 mb-2">Aspect Ratio</Listbox.Label>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-700 border border-gray-600 py-2 pl-3 pr-10 text-left text-white shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm">
                  <span className="block truncate">{selectedRatio.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a.75.75 0 01.53.22l3.5 3.5a.75.75 0 01-1.06 1.06L10 4.81 6.53 8.28a.75.75 0 01-1.06-1.06l3.5-3.5A.75.75 0 0110 3zM10 17a.75.75 0 01-.53-.22l-3.5-3.5a.75.75 0 011.06-1.06L10 15.19l3.47-3.47a.75.75 0 011.06 1.06l-3.5 3.5A.75.75 0 0110 17z" clipRule="evenodd" /></svg>
                  </span>
                </Listbox.Button>
                <Transition show={open} as={React.Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {aspectRatios.map((ratio) => (
                      <Listbox.Option key={ratio.id} className={({ active }) => `${active ? 'bg-purple-600 text-white' : 'text-gray-300'} relative cursor-default select-none py-2 pl-3 pr-9`} value={ratio.id}>
                        {({ selected, active }) => (
                          <>
                            <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>{ratio.name}</span>
                            {selected && (
                              <span className={`${active ? 'text-white' : 'text-purple-500'} absolute inset-y-0 right-0 flex items-center pr-4`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
};

export default StyleSelector;
