type cardProps = {
    image: string;
}

export default function Card({image}: cardProps){
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img src={image} />
        </div>
    )
}