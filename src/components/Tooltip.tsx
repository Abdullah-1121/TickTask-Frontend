import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ToolTip({tool_tip , children}:{tool_tip:string , children:React.ReactNode}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tool_tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
