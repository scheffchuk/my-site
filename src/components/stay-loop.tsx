import { TextLoop } from '@/components/ui/text-loop';

export function StayTextLoop() {
  return (
    <div className='block mt-8 whitespace-pre-wrap text-base font-medium'>
      Stay{' '}
      <TextLoop
        className='overflow-y-clip'
        variants={{
          initial: {
            y: 20,
            rotateX: 90,
            opacity: 0,
            filter: 'blur(2px)',
          },
          animate: {
            y: 0,
            rotateX: 0,
            opacity: 1,
            filter: 'blur(0px)',
          },
          exit: {
            y: -20,
            rotateX: -90,
            opacity: 0,
            filter: 'blur(2px)',
          },
        }}
      >
        <span>hungry</span>
        <span>foolish</span>
        <span>creative</span>
        <span>innovative</span>
        <span>healthy</span>
      </TextLoop>
    </div>
  );
}
