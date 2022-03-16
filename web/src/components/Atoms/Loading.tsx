import '../../styles/loading.scss';

type LoadingProps = {
    isLoading?: boolean;
};

export function Loading(props: LoadingProps) {

  return (
    <>
      <div className="ring">Loading
        <span></span>
      </div>
    </>
  )
}