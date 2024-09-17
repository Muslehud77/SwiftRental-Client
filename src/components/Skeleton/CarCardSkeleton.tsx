import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Skeleton } from "../ui/skeleton";

const CarCardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <CardContainer key={index}>
          <CardBody className="hover:border border-primary/20 w-full h-full md:h-80 bg-transparent backdrop-blur-lg bg-opacity-100 p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-8">
            <CardItem
              translateY={-10}
              translateX={-10}
              className="relative w-full md:w-96 h-auto overflow-hidden rounded-xl"
            >
              <Skeleton className="w-full h-48 md:h-full rounded-xl" />
            </CardItem>

            <div className="flex flex-col justify-between w-full">
              <CardItem translateY={-8} translateX={-8} className="mt-4">
                <Skeleton className="w-3/4 h-6 sm:h-8" />
              </CardItem>

              <CardItem translateY={-6} translateX={-6} className="mt-2">
                <Skeleton className="w-1/2 h-4 sm:h-6" />
              </CardItem>

              <CardItem
                translateY={-5}
                translateX={-5}
                className="flex flex-wrap gap-2 mt-4"
              >
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="w-20 h-6 rounded-full bg-primary/10"
                  />
                ))}
              </CardItem>

              <div className="flex flex-col sm:flex-row justify-between w-full mt-6 gap-4">
                <CardItem translateY={-5} translateX={-5}>
                  <Skeleton className="w-24 h-6 sm:h-8" />
                  <Skeleton className="w-16 h-4 mt-2" />
                </CardItem>
                <CardItem
                  translateY={-4}
                  translateX={-4}
                  className="w-full sm:w-auto"
                >
                  <Skeleton className="w-full h-10 rounded-full" />
                </CardItem>
              </div>
            </div>
          </CardBody>
        </CardContainer>
      ))}
    </>
  );
};

export default CarCardSkeleton;