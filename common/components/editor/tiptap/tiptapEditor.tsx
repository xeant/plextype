"use client";

import React, { useImperativeHandle, forwardRef, useEffect, useCallback, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import { Image } from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Link } from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight"; // ✅ 추가
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';

import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Code, Quote, List, ListOrdered, Table as TableIcon,
  Heading1, Heading2, Heading3, Undo, Redo, Minus,
  AlignLeft, AlignCenter, AlignRight, Link as LinkIcon,
  ChevronDown, Highlighter, Heading as HeadingIcon, Type, SquareCode, X
} from "lucide-react";

const HIGHLIGHT_COLORS = [
  { name: '노랑', color: '#ffec3d' }, // Yellow
  { name: '초록', color: '#b7eb8f' }, // Green
  { name: '파랑', color: '#91d5ff' }, // Blue
  { name: '분홍', color: '#fff0f6' }, // Pink
  { name: '보라', color: '#efdbff' }, // Purple
  { name: '주황', color: '#ffd591' }, // Orange
];

export interface TiptapEditorProps {
  onChange: (content: string) => void;
  initialContent?: string;
}


const TiptapEditor = forwardRef((props: TiptapEditorProps, ref) => {
  const { onChange, initialContent } = props;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [linkUrl, setLinkUrl] = useState(""); // 입력창의 URL 상태
  const dropdownRef = useRef<HTMLDivElement>(null);

  const parseContent = (content?: string) => {
    if (!content) return "";
    let raw = content;
    if (raw.startsWith('"') && raw.endsWith('"')) raw = raw.slice(1, -1);
    try {
      const json = JSON.parse(raw);
      if (json.type === "doc") return json;
      return raw;
    } catch (e) {
      return raw;
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // ✅ 1. 인라인 코드 스타일 클래스 주입
        code: {
          HTMLAttributes: {
            class: 'bg-teal-100 text-teal-600 px-1.5 py-0.5 rounded-md font-mono text-[0.9em] font-medium',
          },
        },
        blockquote: { HTMLAttributes: { class: 'border-l-4 border-gray-300 pl-4 italic text-gray-600' } },
        codeBlock: { HTMLAttributes: { class: 'rounded-md bg-gray-100 text-gray-600 p-4 font-mono text-sm my-4' } },
      }),
      BulletList.configure({
        HTMLAttributes: { class: 'list-disc ml-4' },
      }),
      OrderedList.configure({
        HTMLAttributes: { class: 'list-decimal ml-4' },
      }),
      ListItem,
      Underline,
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-600 underline cursor-pointer' } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow, TableHeader, TableCell, Image,
      Placeholder.configure({ placeholder: "내용을 입력하세요..." }),
    ],
    content: parseContent(initialContent),
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        // ✅ 2. Tailwind prose 커스텀: 앞뒤 따옴표(`) 제거 및 에디터 내부 스타일 강화
        class: "prose prose-zinc prose-sm focus:outline-none max-w-none min-h-[400px] p-8 text-gray-800 " +
          "prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-gray-400 " + // 리스트 스타일 강제 적용
          "prose-code:before:content-none prose-code:after:content-none " +
          "prose-code:bg-zinc-100 prose-code:text-[#eb5757] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md " +
          "prose-blockquote:border-l-4 prose-blockquote:border-gray-300",
      },
    },
  });

  useEffect(() => {
    if (editor && initialContent && editor.isEmpty) {
      const parsed = parseContent(initialContent);
      editor.commands.setContent(parsed);
    }
  }, [initialContent, editor]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // 클릭된 요소가 드롭다운 영역 외부일 경우 닫기
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activeDropdown]);

  // ✅ 3. 에러 나던 applyLink (컴포넌트 내부로 이동 + Null Guard)
  const applyLink = useCallback(() => {
    if (!editor) return;

    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      const url = linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`;
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
    setLinkUrl("");
    setActiveDropdown(null);
  }, [editor, linkUrl]);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL을 입력하세요', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  useImperativeHandle(ref, () => editor);

  if (!editor) return null;

  return (
    <div className="w-full border border-gray-200 rounded-2xl overflow-hidden bg-white focus:border-gray-900 hover:border-gray-900 transition-all duration-200 hover:border-gray-300 focus-within:border-gray-300  dark:border-dark-700 dark:bg-dark-900 dark:hover:border-dark-500 dark:focus-within:border-dark-300 dark:focus-within:ring-dark-300 flex flex-col">
      {/* 🛠️ 툴바 영역 */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-100 sticky top-0 z-20">

        {/* 히스토리 */}
        <div className="flex items-center gap-1 mr-1">
          <ToolbarButton tooltip="실행 취소" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} icon={<Undo className="w-4 h-4" />} />
          <ToolbarButton tooltip="다시 실행" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} icon={<Redo className="w-4 h-4" />} />
        </div>

        <Divider />

        {/* 텍스트 서식 */}
        <ToolbarButton tooltip="굵게" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} icon={<Bold className="w-4 h-4" />} />
        <ToolbarButton tooltip="기울임" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} icon={<Italic className="w-4 h-4" />} />
        <ToolbarButton tooltip="밑줄" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} icon={<UnderlineIcon className="w-4 h-4" />} />
        <ToolbarButton tooltip="취소선" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} icon={<Strikethrough className="w-4 h-4" />} />
        {/* ✅ 여기서부터 형광펜 드롭다운 시작 */}
        <div className="relative" ref={activeDropdown === 'highlight' ? dropdownRef : null}>
          <DropdownButton
            tooltip="형광펜 색상"
            isOpen={activeDropdown === 'highlight'}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              setActiveDropdown(activeDropdown === 'highlight' ? null : 'highlight');
            }}
            active={editor.isActive('highlight')}
            icon={<Highlighter className="w-4 h-4" />}
          />
          {activeDropdown === 'highlight' && (
            <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-3 animate-in fade-in zoom-in duration-150" onClick={e => e.stopPropagation()}>
              <div className="grid grid-cols-6 gap-2 mb-2">
                {HIGHLIGHT_COLORS.map((item) => (
                  <button
                    key={item.color}
                    type="button"
                    title={item.name}
                    onClick={() => {
                      editor.chain().focus().toggleHighlight({ color: item.color }).run();
                      setActiveDropdown(null);
                    }}
                    className="h-5 w-5 rounded-full border border-gray-200 transition-transform hover:scale-125"
                    style={{ backgroundColor: item.color }}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().unsetHighlight().run();
                  setActiveDropdown(null);
                }}
                className="w-full text-[11px] py-1 text-gray-500 hover:bg-gray-50 rounded border border-dashed border-gray-200"
              >
                형광펜 지우기
              </button>
            </div>
          )}
        </div>
        {/* ✅ 형광펜 드롭다운 끝 */}
        <div className="relative" ref={activeDropdown === 'link' ? dropdownRef : null}>
          <DropdownButton
            tooltip="링크 삽입"
            isOpen={activeDropdown === 'link'}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              setLinkUrl(editor.getAttributes('link').href || "");
              setActiveDropdown(activeDropdown === 'link' ? null : 'link');
            }}
            active={editor.isActive('link')}
            icon={<LinkIcon className="w-4 h-4" />}
          />

          {activeDropdown === 'link' && (
            <div
              className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ✅ 팝오버 헤더: 타이틀과 닫기 버튼 */}
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-100">
                <span className="text-[11px] font-bold text-gray-500">URL 연결</span>
                <button
                  type="button"
                  onClick={() => setActiveDropdown(null)}
                  className="p-1 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              </div>

              <div className="p-3 flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && applyLink()}
                    placeholder="https://example.com"
                    className="flex-1 text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-all text-gray-800"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={applyLink}
                    className="px-3 py-2 bg-gray-900 text-white text-xs rounded-lg hover:bg-gray-800 transition-all shadow-md"
                  >
                    적용
                  </button>
                </div>
                {editor.isActive('link') && (
                  <button
                    type="button"
                    onClick={() => {
                      editor.chain().focus().unsetLink().run();
                      setActiveDropdown(null);
                    }}
                    className="text-[10px] text-red-500 hover:bg-red-50 py-1.5 rounded-md transition-all font-medium border border-transparent hover:border-red-100"
                  >
                    링크 제거하기
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <Divider />

        {/* ✅ Heading 드롭다운 */}
        <div className="relative">
          <DropdownButton
            tooltip="제목 설정"
            isOpen={activeDropdown === 'heading'}
            onClick={() => setActiveDropdown(activeDropdown === 'heading' ? null : 'heading')}
            active={editor.isActive('heading')}
            icon={<HeadingIcon className="w-4 h-4" />}
            label={
              editor.isActive('heading', { level: 1 }) ? 'H1' :
                editor.isActive('heading', { level: 2 }) ? 'H2' :
                  editor.isActive('heading', { level: 3 }) ? 'H3' : '제목'
            }
          />
          {activeDropdown === 'heading' && (
            <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-1 animate-in fade-in zoom-in duration-150">
              {[1, 2, 3].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => { editor.chain().focus().toggleHeading({ level: level as any }).run(); setActiveDropdown(null); }}
                  className={`w-full text-left px-3 py-1.5 text-sm rounded hover:bg-gray-100 flex items-center justify-between ${editor.isActive('heading', { level }) ? 'bg-gray-50 text-blue-600 font-bold' : 'text-gray-700'}`}
                >
                  제목 {level}
                  <span className="text-[10px] text-gray-400 font-normal">H{level}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ✅ List 드롭다운 */}
        <div className="relative">
          <DropdownButton
            tooltip="목록 설정"
            isOpen={activeDropdown === 'list'}
            onClick={() => setActiveDropdown(activeDropdown === 'list' ? null : 'list')}
            active={editor.isActive('bulletList') || editor.isActive('orderedList')}
            icon={<List className="w-4 h-4" />}
          />
          {activeDropdown === 'list' && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-1 animate-in fade-in zoom-in duration-150">
              <button
                type="button"
                onClick={() => { editor.chain().focus().toggleBulletList().run(); setActiveDropdown(null); }}
                className={`flex items-center gap-2 w-full text-left px-3 py-1.5 text-sm rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-50 text-blue-600' : 'text-gray-700'}`}
              >
                <List className="w-4 h-4" /> 불렛 리스트
              </button>
              <button
                type="button"
                onClick={() => { editor.chain().focus().toggleOrderedList().run(); setActiveDropdown(null); }}
                className={`flex items-center gap-2 w-full text-left px-3 py-1.5 text-sm rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-50 text-blue-600' : 'text-gray-700'}`}
              >
                <ListOrdered className="w-4 h-4" /> 숫자 리스트
              </button>
            </div>
          )}
        </div>

        <Divider />

        {/* 정렬 그룹 */}
        <div className="flex items-center gap-1">
          <ToolbarButton tooltip="왼쪽 정렬" onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} icon={<AlignLeft className="w-4 h-4" />} />
          <ToolbarButton tooltip="가운데 정렬" onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} icon={<AlignCenter className="w-4 h-4" />} />
          <ToolbarButton tooltip="오른쪽 정렬" onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} icon={<AlignRight className="w-4 h-4" />} />
        </div>

        <Divider />

        {/* 기타 블록 */}
        <ToolbarButton tooltip="인용구" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} icon={<Quote className="w-4 h-4" />} />
        <ToolbarButton
          tooltip="인라인 코드"
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          icon={<Code className="w-4 h-4" />}
        />
        <ToolbarButton tooltip="코드 블록" onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} icon={<SquareCode className="w-4 h-4" />} />
        <ToolbarButton tooltip="가로 구분선" onClick={() => editor.chain().focus().setHorizontalRule().run()} icon={<Minus className="w-4 h-4" />} />
        <ToolbarButton tooltip="표 삽입" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} icon={<TableIcon className="w-4 h-4" />} />
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
});

// ✅ 툴팁 기능이 통합된 버튼 컴포넌트
const ToolbarButton = ({ onClick, active, disabled, icon, tooltip }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`p-2 rounded-md transition-all duration-200 ${active
          ? "bg-gray-900 text-white shadow-sm scale-105"
          : "text-gray-500 hover:bg-gray-200 hover:text-gray-900 disabled:opacity-20"
          }`}
      >
        {icon}
      </button>
      {isHovered && tooltip && !disabled && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded whitespace-nowrap z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-1">
          {tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
      )}
    </div>
  );
};

// 드롭다운 전용 버튼
const DropdownButton = ({ onClick, active, icon, isOpen, tooltip, label }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center gap-1.5 px-2 py-2 rounded-md transition-all ${active || isOpen ? "bg-gray-100 text-blue-600" : "text-gray-500 hover:bg-gray-200"
          }`}
      >
        {icon}
        {label && <span className="text-xs font-medium">{label}</span>}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isHovered && !isOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded whitespace-nowrap z-50 pointer-events-none">
          {tooltip}
        </div>
      )}
    </div>
  );
};

const Divider = () => <div className="w-[1px] h-4 bg-gray-200 mx-1" />;

TiptapEditor.displayName = "TiptapEditor";
export default TiptapEditor;