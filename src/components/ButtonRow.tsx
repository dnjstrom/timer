import useLocalStorageState from 'use-local-storage-state';
import SetButton from './SetButton';
import ClearButton from './ClearButton';

export default function ButtonRow({ id, title }: { id: string; title: string }) {
  const [time, setTime] = useLocalStorageState<string>(id, {
    defaultValue: '',
  });

  const timeString = time?.match(/\d\d:\d\d/)?.[0] ?? '';

  return (
    <div className="flex gap-4 items-center justify-between p-6 py-6">
      <div className="mr-auto">{title}</div>
      <input
        type="time"
        value={timeString}
        onChange={(evt) => {
          const value = evt.currentTarget.value;
          const [hours, minutes] = value.split(':');
          const time = new Date();
          time.setHours(parseInt(hours, 10));
          time.setMinutes(parseInt(minutes, 10));
          setTime(time.toString());
        }}
      />
      {timeString ? (
        <ClearButton
          onClick={() => {
            setTime('');
          }}
        ></ClearButton>
      ) : (
        <SetButton
          onClick={() => {
            setTime(new Date().toString());
          }}
        ></SetButton>
      )}
    </div>
  );
}
