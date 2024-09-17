import { ReactNode, useEffect, useRef, useState } from 'react';
import ButtonRow from '../components/ButtonRow';
import clsx from 'clsx';
import { ConfigProvider, Dropdown } from 'antd';
import useLocalStorageState from 'use-local-storage-state';

const forXTimes = (n: number) => Array.from({ length: n }, (_, i) => i);

function Page({ id }: { id: number }) {
  return (
    <div className="flex flex-col divide-y">
      <ButtonRow id={`larm-${id}`} title="Larm"></ButtonRow>
      <ButtonRow id={`departure-${id}`} title="Avgång hamn"></ButtonRow>
      <ButtonRow id={`arrival-${id}`} title="Framme objekt"></ButtonRow>
      <ButtonRow id={`finished-${id}`} title="Klar objekt"></ButtonRow>
      <ButtonRow id={`return-${id}`} title="Åter hamn"></ButtonRow>
    </div>
  );
}

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
        'bg-slate-200 px-4 py-2 h-[20vw] w-[20vw] flex-shrink-0 text-xl',
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
        <div className="fixed left-[env(safe-area-inset-left)] right-[env(safe-area-inset-right)] bottom-[env(safe-area-inset-bottom)] flex bg-slate-50">
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
