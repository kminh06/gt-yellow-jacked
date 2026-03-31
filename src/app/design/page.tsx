// Design page for developers to see the design system and components in isolation
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card} from "@/components/ui/card"
export default function DesignPage() {
    return (
    <div className="p-10 space-y-10">

      <section>
        <div className="flex gap-3">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </section>

      <section>
        <Input placeholder="Enter input here" />
      </section>

      <section>
        <Card> Exercise </Card>
      </section>






    </div>
  )
}
