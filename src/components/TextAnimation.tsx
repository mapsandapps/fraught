import { TypeAnimation } from 'react-type-animation';

interface TextAnimationProps {
  text: string,
  onFinish?: () => void;
}

export default function TextAnimation(props: TextAnimationProps) {
  const { onFinish, text } = props;

  const noop = () => {}

  return (
    <TypeAnimation
      sequence={[
        text,
        onFinish || noop,
      ]}
      wrapper="span"
      cursor={false}
    />
  );
}
