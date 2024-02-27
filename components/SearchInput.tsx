import useDebounce from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce<string>(value);
  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    const query = { title: debouncedValue };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }, [debouncedValue, router]);

  if (pathname !== "/") return null;

  return (
    <div className="relative sm:block hidden">
      <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
      <Input
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-10 bg-primary/10"
      />
    </div>
  );
};

export default SearchInput;
