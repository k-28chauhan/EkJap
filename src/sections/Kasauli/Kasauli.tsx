import { Section } from '@/components/ui/Section'
import { PostcardRow } from './Postcards'
import { RouteMap } from './RouteMap'
import { TownIntro } from './TownIntro'

export function Kasauli() {
  return (
    <Section id="kasauli" theme="day" labelledBy="town-title" className="overflow-x-clip">
      <TownIntro />
      <PostcardRow />
      <RouteMap />
    </Section>
  )
}
