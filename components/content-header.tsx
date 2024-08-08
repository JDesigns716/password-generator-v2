interface ContentHeaderProps {
  policy: string;
}

const ContentHeader = ({ policy }: ContentHeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <p className="text-muted-foreground text-sm">{policy}</p>
    </div>
  );
};

export default ContentHeader;
