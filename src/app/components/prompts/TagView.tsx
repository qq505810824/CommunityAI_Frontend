import { Circle } from "@mui/icons-material";
import { Chip, ChipDelete } from "@mui/joy";

interface ViewProps {
    tag?: any;
    onSelect?: any
    onDelete?: any
}

export default function TagView(props: ViewProps) {
    const {
        tag,
        onSelect,
        onDelete
    } = props

    return (
        <>
            <div
                onClick={(e) => {
                    e.stopPropagation(); // 阻止事件冒泡
                    if (onSelect) onSelect(); // 确保 onSelect 被调用
                }}
            >
                <Chip
                    size="lg"
                    variant="soft"
                    color="primary"
                    startDecorator={<Circle sx={{ width: 8, color: tag?.color }} />}
                    endDecorator={onDelete && <ChipDelete onDelete={onDelete} />}
                    sx={{
                        fontSize: 14,
                        backgroundColor: `${tag?.color}1a !important`,
                        borderRadius: 4,
                        paddingX: 1,
                        paddingY: 0.5,
                        color: `${tag?.color} !important`,
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',
                        cursor: onSelect ? 'pointer' : ''
                    }}
                >
                    {tag?.name}
                </Chip>
            </div>
            {/* <Typography
                startDecorator={<Circle sx={{ width: 8, color: tag?.color }} />}
                endDecorator={<ChipDelete sx={{ width: 2, color: tag?.color }} />}
                sx={{
                    fontSize: 14,
                    backgroundColor: tag?.color + '1a',
                    borderRadius: 4,
                    paddingX: 1,
                    paddingY: 0.5,
                    color: tag?.color,
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    cursor: onSelect ? 'pointer' : ''
                }}
                onClick={onSelect} // 添加 onClick 事件
            >{tag?.name}</Typography> */}
        </>
    )
}