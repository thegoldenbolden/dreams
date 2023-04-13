type IconProps = JSX.IntrinsicElements['svg']

// Heroicons - https://heroicons.com/

export const BaseIcon = (props: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export const MinusCircleIcon = (props: IconProps) => {
  return (
    <BaseIcon {...props} aria-label="minus icon">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </BaseIcon>
  )
}

export const AddCircleIcon = (props: IconProps) => {
  return (
    <BaseIcon {...props} aria-label="add icon">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </BaseIcon>
  )
}
