import { ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ConfigProvider, Dropdown } from 'antd';
import useLocalStorageState from 'use-local-storage-state';
import { forXTimes } from '../utils/forXTimes';
import { Page } from '../components/Page';

function Tab({
  onClick,
  children,
  active = false,
  shadow = false,
  className,
}: {
  className?: string;
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
  shadow?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (active && ref) {
      ref.current?.scrollIntoView({});
    }
  }, [active]);

  return (
    <button
      ref={ref}
      style={{
        boxShadow: shadow ? 'inset 0 4px 4px -4px rgba(0,0,0,.3)' : undefined,
      }}
      className={clsx(
        'bg-slate-200 px-4 py-2 h-[100px] w-[100px] flex-shrink-0 text-xl',
        active && 'text-black bg-white',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [nrPages, setNrPages] = useLocalStorageState('number-of-pages', {
    defaultValue: 1,
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#fa1432',
        },
      }}
    >
      <div className="pb-20">
        <div className="sticky top-0 flex justify-between p-6 text-white bg-[rgb(0,140,180)]">
          <h1 className="text-3xl font-bold">Uppdrag {currentPage + 1}</h1>
          <Dropdown
            menu={{
              items: [
                {
                  key: 'clear-all',
                  onClick: () => {
                    localStorage.clear();
                    setNrPages(1);
                    location.reload();
                  },
                  label: 'Rensa alla uppdrag',
                  danger: true,
                },
              ],
            }}
            placement="bottomRight"
          >
            <button className="text-3xl px-4 -mr-4">⋮</button>
          </Dropdown>
        </div>
        <div>
          <Page id={currentPage}></Page>
        </div>
        <div className="fixed left-[env(safe-area-inset-left)] right-[env(safe-area-inset-right)] bottom-[env(safe-area-inset-bottom)] flex bg-slate-100">
          <div className="flex overflow-auto divide-x divide-slate-300">
            {forXTimes(nrPages).map((i) => (
              <Tab
                key={i}
                shadow={currentPage !== i}
                active={currentPage === i}
                onClick={() => {
                  setCurrentPage(i);
                }}
              >
                {i + 1}
              </Tab>
            ))}
          </div>

          <Tab
            className="!bg-[rgb(0,140,180)] text-white"
            onClick={() => {
              setNrPages((prev) => {
                const nextTotalPages = prev + 1;
                setCurrentPage(nextTotalPages - 1);
                return nextTotalPages;
              });
            }}
          >
            +
          </Tab>
        </div>
      </div>
    </ConfigProvider>
  );
}
