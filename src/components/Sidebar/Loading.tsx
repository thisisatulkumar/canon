import {
    Item,
    ItemContent,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"

const Loading = () => {
    return (
        <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
            <Item variant="muted">
                {/* Spinner */}
                <ItemMedia>
                    <Spinner />
                </ItemMedia>

                {/* Loading text */}
                <ItemContent>
                    <ItemTitle className="line-clamp-1">Loading...</ItemTitle>
                </ItemContent>
            </Item>
        </div>
    )
}

export default Loading
