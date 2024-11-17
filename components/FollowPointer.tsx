import { motion } from "framer-motion";
import { stringToColor } from "@/lib/stringToColor";

function FollowPointer({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const color = stringToColor(info.email || "1");

  return (
    <motion.div
      className='h-4 w-4 rounded-full absolute z-50'
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke={color}
        width='24'
        height='36'
        viewBox='0 0 24 36'
        className='translate-y-[10px]'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z'
          fill={color}
        />
      </svg>
      <motion.div
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
        }}
        className='px-2 py-2 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full'
        style={{ backgroundColor: color }}
      >
        {info.name || info.email}
      </motion.div>
    </motion.div>
  );
}

export default FollowPointer;
