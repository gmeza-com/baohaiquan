import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Select,
  SelectItem,
  // Autocomplete,
  // AutocompleteItem,
  // Chip,
} from "@nextui-org/react";
import { isString } from "common";
import { useEffect, useState } from "react";

export default function Meta({
  onChange,
  isOpen,
  onClose,
  onSubmit,
  onSave,
  submitting,
  categories,
  cat: initCat,
  hashtags: initHashtags,
  desc: initDesc,
  published,
  // suggesteds,
}) {
  const [hashtags, setHashtags] = useState(initHashtags);
  const [desc, setDesc] = useState(initDesc);
  const [cat, setCat] = useState(initCat);
  const [isValid, setIsValid] = useState(false);
  const [completed, setCompleted] = useState(false);
  // const [remains, setRemains] = useState(suggesteds);

  useEffect(() => {
    onChange({ hashtags, desc, cat });

    // desc
    if (
      ((isString(desc) && desc.length > 19) ||
        (isString(initDesc) && initDesc.length > 19)) &&
      (typeof cat !== "undefined" || typeof initCat !== "undefined")
    )
      setIsValid(true);
    else setIsValid(false);
  }, [hashtags, desc, cat]);

  useEffect(() => {
    if (
      ((isString(desc) && desc.length > 19) ||
        (isString(initDesc) && initDesc.length > 19)) &&
      (typeof cat !== "undefined" || typeof initCat !== "undefined")
    )
      setIsValid(true);
    else setIsValid(false);
  }, [initHashtags, initDesc, initCat]);

  // const addHashtag = (label) => {
  //   let exist = false;
  //   hashtags.map((el) => {
  //     if (el?.value === label) exist = true;
  //     return true;
  //   });

  //   if (!exist)
  //     setHashtags([...hashtags, { value: label, label, description: label }]);
  // };

  // const onKeyUp = (e) => {
  //   if (e.keyCode === 13) {
  //     e.preventDefault();
  //     const str = e.currentTarget.value.trim().replaceAll(",", "");
  //     e.currentTarget.value = "";
  //     if (isString(str) && str.length > 2) addHashtag(str.replaceAll(" ", "-"));
  //     return true;
  //   }
  // };

  // const removeHashtag = (id) => {
  //   setHashtags(hashtags.filter((el) => `${el?.value}` !== `${id}`));

  //   // append to the remains
  //   setRemains([
  //     ...remains,
  //     ...suggesteds.filter((el) => `${el?.value}` === `${id}`),
  //   ]);
  // };

  // const onChooseHashtag = (id) => {
  //   if (isString(`${id}`)) {
  //     // 1. get the selected object
  //     const item = suggesteds.filter((el) => `${el?.value}` === id).pop();

  //     // 2. remove from list of selection
  //     setRemains(remains.filter((el) => `${el?.value}` !== id));

  //     // 3. add to list of selected
  //     if (isNum(item?.value)) setHashtags([...hashtags, item]);
  //   }
  // };

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Thông tin nâng cao
        </ModalHeader>
        <Divider />
        <ModalBody className="py-6 gap-3">
          <Textarea
            isRequired
            label="Mô tả (20 - 196 ký tự)"
            labelPlacement="outside"
            placeholder="Nhập mô tả bài đăng"
            fullWidth={true}
            variant="bordered"
            className="mb-3"
            onValueChange={setDesc}
            defaultValue={initDesc}
            style={{ lineHeight: "1.75" }}
          />
          <Select
            label="Chủ đề"
            isRequired
            placeholder="Chọn một chủ đề"
            labelPlacement="outside"
            variant="bordered"
            className="mb-3"
            fullWidth={true}
            defaultSelectedKeys={[`${initCat}`]}
            selectedKeys={cat}
            onChange={(e) => {
              setCat(e?.target.value);
            }}
            disableSelectorIconRotation
          >
            {Array.isArray(categories) &&
              categories.map((el) => {
                return (
                  <SelectItem key={el?.id} value={el?.id}>
                    {el?.attributes?.name}
                  </SelectItem>
                );
              })}
          </Select>
          {/* <Autocomplete
            label="Hashtag"
            placeholder="Nhập hashtag cho bài viết"
            defaultItems={remains}
            labelPlacement="outside"
            fullWidth={true}
            allowsCustomValue={true}
            disableSelectorIconRotation
            variant="bordered"
            onSelectionChange={onChooseHashtag}
            onKeyUp={onKeyUp}
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <div>
            {hashtags.map((el, idx) => (
              <Chip
                key={`hashtag-${idx}`}
                onClose={() => removeHashtag(el?.value)}
                className="me-1 mb-1"
              >
                {el?.label}
              </Chip>
            ))}
          </div> */}
        </ModalBody>
        <ModalFooter className="border-t-1">
          {!published && (
            <Button
              onClick={() => {
                setCompleted(false);
                onSave();
              }}
              isDisabled={submitting || !isValid}
              isLoading={submitting && !completed}
            >
              Lưu bản nhấp
            </Button>
          )}
          <Button
            onClick={() => {
              setCompleted(true);
              onSubmit();
            }}
            isDisabled={submitting || !isValid}
            color="primary"
            isLoading={submitting && completed}
          >
            Đăng bài
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
