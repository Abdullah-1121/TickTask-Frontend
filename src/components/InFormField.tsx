import { InFieldProps } from "@/lib/types";

const InFormField: React.FC<InFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
    className="m-2 rounded-lg border-1 border-black p-2 bg-gray-100"
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      
    />
    {error && <span className="error-message text-red-500 text-center text-[11px]">{error.message}</span>}
  </>
);
export default InFormField;