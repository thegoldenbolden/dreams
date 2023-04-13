const baseClass = 'bg-transparent'

export function Input(props: JSX.IntrinsicElements['input']) {
  return (
    <div className="flex flex-col gap-px">
      <label htmlFor={props.id}>{props.name}</label>
      <input {...props} className={`${baseClass} ${props.className}`} />
    </div>
  )
}

export function TextArea(props: JSX.IntrinsicElements['textarea']) {
  return (
    <div className="flex flex-col gap-px">
      <label htmlFor={props.id}>{props.name}</label>
      <textarea {...props} className={`${baseClass} ${props.className}`} />
    </div>
  )
}
