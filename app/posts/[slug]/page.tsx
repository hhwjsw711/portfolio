import { format, parseISO } from 'date-fns';
import { allPosts } from 'contentlayer/generated';
import Image from 'next/image';
import SVGGradientBg from '@/components/Hero/SVGGradientBg';
import Menu from '@/components/Hero/Menu/Menu';
import BlogViewsIcon from '@/public/images/svg/BlogViewsIcon.svg';
import ReadTimeIcon from '@/public/images/svg/ReadTimeIcon.svg';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) notFound();
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <div className="relative overflow-x-hidden">
      <article className="mx-auto max-w-5xl py-8 text-white">
        <SVGGradientBg />
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <Menu />
        </div>
        <div className="lg:mt-30 relative z-10 mb-8 mt-10 px-2 text-center">
          <h1 className="inline-block bg-gradient-to-t from-[#F26FD8] to-[#FFF4F4] bg-clip-text text-2xl font-bold text-transparent lg:text-6xl">
            {post.title}
          </h1>
          <p className="mb-10 mt-2 text-sm text-white lg:text-lg">
            {post.description}
          </p>
          <div className="relative">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={1000}
              height={1000}
              className="rounded-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 rounded-2xl bg-black/50" />
            <div className="absolute bottom-3 left-3 mt-4 flex justify-center space-x-4 text-xs text-white lg:bottom-10 lg:left-10">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2 text-sm lg:text-xl">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={ReadTimeIcon}
                      alt="Read Time"
                      width={16}
                      height={16}
                    />
                    <span className="bg-gradient-to-r from-[#FCD3ED] to-[#F690DF] bg-clip-text font-medium text-transparent">
                      {post.readTime} min read
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Image
                      src={BlogViewsIcon}
                      alt="Blog Views"
                      width={16}
                      height={16}
                    />
                    <span className="bg-gradient-to-r from-[#FCD3ED] to-[#F690DF] bg-clip-text font-medium text-transparent">
                      53,000 views
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-center space-x-1 text-sm lg:text-xl">
                  <div className="m-0">Written on</div>
                  <time dateTime={post.date} className="m-0">
                    {format(parseISO(post.date), 'LLLL d, yyyy')}
                  </time>
                  <div className="m-0">By 0xAquaWolf</div>
                </div>
                <div className="mt-2 flex items-center space-x-1 text-xs lg:text-lg">
                  <div className="m-0">Last updated</div>
                  <time dateTime={'2024-09-12T00:00:00.000Z'} className="m-0">
                    {format(
                      parseISO('2024-09-12T00:00:00.000Z'),
                      'LLLL d, yyyy',
                    )}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="prose prose-sm prose-invert mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <MDXContent />
        </div>
      </article>
    </div>
  );
};

export default PostLayout;
