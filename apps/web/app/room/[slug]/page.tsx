export default async function Page({ params }: { params: { slug: String } }) {
    return (
        <div>
            ROOM {`${params.slug}`}
        </div>
    );
}