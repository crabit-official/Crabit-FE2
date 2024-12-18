'use client';

import type { Ref } from 'react';
import { forwardRef, useState } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import Link from 'next/link';

import Toggle from '@/app/academy/(workspace)/[id]/dashboard/components/Toggle';
import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';
import { QUESTIONS } from '@/shared/constants/question';

interface ICardQuestionProps {
  title: string;
}

function CardQuestion({ title }: ICardQuestionProps, ref: Ref<HTMLDivElement>) {
  const [isClicked, setIsClicked] = useState<number>(0);

  const handleClick = (id: number) => {
    setIsClicked(id);
  };

  return (
    <Framer className="flex w-full flex-col items-center justify-between gap-10 px-10 md:justify-between md:px-20 xl:px-40">
      <Flex rowColumn="center" className="w-full gap-10 2xl:w-5/6">
        <div ref={ref} className="flex w-full items-center justify-start gap-2">
          <AiFillQuestionCircle size={25} />
          <Typography size="h2">{title}</Typography>
        </div>

        <Flex className="w-full flex-col gap-10 md:flex-row">
          <Flex
            as="aside"
            column="start"
            className="w-full justify-center gap-5 py-1 text-base font-semibold text-gray-600 sm:flex-row md:w-52 md:flex-col md:justify-start md:text-lg"
          >
            {QUESTIONS.map((question) => (
              <button
                key={question.id}
                type="button"
                onClick={() => handleClick(question.id)}
                className={`break-keep rounded-lg p-3 hover:bg-gray-100 hover:text-main-pink ${question.id === isClicked ? 'text-main-deep-pink' : 'text-gray-600'}`}
              >
                {question.title}
              </button>
            ))}
          </Flex>
          <Flex column="start" className="w-full gap-3">
            {QUESTIONS.map(
              (q) =>
                q.id === isClicked &&
                q.questions.map((question, idx) => (
                  <Toggle
                    setOpen={false}
                    key={idx}
                    content={
                      <Flex column="start" className="gap-1">
                        {question.contents.map((item, idx) => (
                          <p key={idx} className="whitespace-pre-wrap leading-relaxed">
                            • {item.content}{' '}
                            {item?.url && (
                              <Link href={item.url} className="underline">
                                (바로가기)
                              </Link>
                            )}
                          </p>
                        ))}
                      </Flex>
                    }
                    title={question.title}
                  />
                )),
            )}
          </Flex>
        </Flex>
      </Flex>
    </Framer>
  );
}
export default forwardRef<HTMLDivElement, ICardQuestionProps>(CardQuestion);
