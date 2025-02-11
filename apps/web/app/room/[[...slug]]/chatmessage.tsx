export default function ChatMessage({ message }: { message: string }) {
    return (
        <div className="text-white">
            {message}
        </div>
    );
}