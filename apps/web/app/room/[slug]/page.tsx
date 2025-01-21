export default async function Page({ params }: { params: { slug: String } }) {
    const { slug } = params;

    return (
        <div>
            ROOM {`${slug}`}
        </div>
    );
}