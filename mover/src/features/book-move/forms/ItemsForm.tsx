import React from "react";
import { useFormikContext } from "formik";
import { ValuesType } from "./formUtils";

import { MuiStepSliderControlType } from "@/components/MultiStepSliderComponent/types";
import StepControls from "../components/StepControls";

import colors from "@/assets/scss/colors.module.scss";
import styles from "./styles.module.scss";

import Button from "@/components/Button";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import SelectableItem from "@/components/SelectableItem";
import { MdClose } from "react-icons/md";

import MoveItem from "@/models/Move/Item.model";
import MoveCategory from "@/models/Move/Category.model";
import { useMoveCategoriesWithItems } from "../api/BookMove.hooks";
import QueryStatus from "@/components/QueryStatus";

const ArrowsButtonsStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: ".25rem .5rem",
  backgroundColor: "#9b3543",
};

const CategoryButton = ({
  category,
  selectedCategoryId,
  setSelectedCategoryId,
}: {
  category: MoveCategory;
  selectedCategoryId: number | null;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const formik = useFormikContext<ValuesType>();
  const currentId = category.id;
  const item_ids = formik.values.item_ids;

  const numberOfSelectedProducts: number = React.useMemo(() => {
    return (item_ids || []).reduce((prev, curr) => {
      if ("item_category_id" in curr && curr.item_category_id === currentId) {
        return prev + curr.quantity;
      }
      return prev;
    }, 0);
  }, [item_ids, currentId]);

  return (
    <Button
      type="button"
      variant={category.id === selectedCategoryId ? "primary" : "outlined"}
      style={{ padding: ".25rem .5rem", fontWeight: 600 }}
      key={category.id}
      onClick={() => setSelectedCategoryId(category.id)}
    >
      {category.name}{" "}
      {numberOfSelectedProducts > 0 && `(${numberOfSelectedProducts})`}
    </Button>
  );
};

const Item = ({ item }: { item: MoveItem }) => {
  const formik = useFormikContext<ValuesType>();
  const item_ids = formik.values.item_ids;
  const currentId = item.id;

  const targetItem = React.useMemo(
    () => (item_ids || []).find((_it) => _it.id === item.id),
    [item_ids, currentId]
  );
  const quantity = targetItem?.quantity;

  const handleClick = () => {
    const safeItemIds = item_ids || [];
    if (targetItem === undefined) {
      formik.setFieldValue("item_ids", [
        ...safeItemIds,
        { id: currentId, quantity: 1, item_category_id: item.item_category_id },
      ]);
      return;
    }
    const newItems = safeItemIds.map((_it) =>
      _it.id !== currentId
        ? _it
        : {
            ..._it,
            quantity: _it.quantity + 1,
          }
    );
    formik.setFieldValue("item_ids", newItems);
  };

  const handleRemove = () => {
    const newItems = (item_ids || []).filter((_it) => _it.id !== item.id);
    formik.setFieldValue("item_ids", newItems);
  };

  const isThereAQuantity = quantity !== undefined && quantity > 0;
  return (
    <SelectableItem
      isSelected={isThereAQuantity}
      onClick={handleClick}
      style={{ position: "relative" }}
    >
      <h6 style={{ lineHeight: 1.2 }}>{item.name}</h6>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          marginTop: "3px",
        }}
      >
        <p>{item.unit_price}$</p>
        <p>{isThereAQuantity && <strong>x{quantity}</strong>}</p>
      </div>

      {isThereAQuantity && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
          style={ArrowsButtonsStyles}
          className={styles.remove_btn}
        >
          <MdClose />
        </span>
      )}
    </SelectableItem>
  );
};

const ItemsForm = ({
  controls,
  item_categories,
}: {
  controls: MuiStepSliderControlType;
  item_categories: MoveCategory[];
}) => {
  const formik = useFormikContext<ValuesType>();
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    number | null
  >(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const items: MoveItem[] = React.useMemo(() => {
    if (!selectedCategoryId || !item_categories) return [];
    return (
      item_categories.find((cat) => cat.id === selectedCategoryId)?.items ?? []
    );
  }, [selectedCategoryId, item_categories]);

  React.useLayoutEffect(() => {
    if (item_categories && item_categories.length > 0) {
      setSelectedCategoryId(item_categories.at(0)?.id ?? null);
    }
  }, [item_categories]);

  const handleLeftScroll = React.useCallback(() => {
    if (ref.current?.scrollLeft !== undefined) {
      ref.current.scrollLeft -= 150;
    }
  }, []);
  const handleRightScroll = React.useCallback(() => {
    if (ref.current?.scrollLeft !== undefined) {
      ref.current.scrollLeft += 150;
    }
  }, []);

  return (
    <>
      <div className={styles.items_form_container}>
        <h5>
          What you want to <span style={{ color: colors.primary }}>MOVE?</span>
        </h5>
        <div className={styles.categories_container}>
          <Button
            style={ArrowsButtonsStyles}
            type="button"
            onClick={handleLeftScroll}
          >
            <AiOutlineCaretLeft />
          </Button>
          <div className={styles.swipeable_categoris} ref={ref}>
            {(item_categories || []).map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                selectedCategoryId={selectedCategoryId}
                setSelectedCategoryId={setSelectedCategoryId}
              />
            ))}
          </div>
          <Button
            style={ArrowsButtonsStyles}
            type="button"
            onClick={handleRightScroll}
          >
            <AiOutlineCaretRight />
          </Button>
        </div>
        <br />
        {items.length === 0 ? (
          <p
            style={{
              fontWeight: "bold",
              fontSize: ".85em",
              paddingBlock: "2rem",
              textAlign: "center",
            }}
          >
            No items available in this category
          </p>
        ) : (
          <div className={styles.items_container}>
            {items.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
      <StepControls
        controls={controls}
        disableSubmit={formik.values.item_ids.length === 0}
      />
    </>
  );
};

const ItemsWithQuery = ({
  controls,
}: {
  controls: MuiStepSliderControlType;
}) => {
  const { data, isLoading, isError, refetch } = useMoveCategoriesWithItems();
  const item_categories = React.useMemo(() => {
    if (data?.data.item_categories) return data.data.item_categories;
    return [];
  }, [data]);

  if (isLoading || isError) {
    return (
      <QueryStatus isLoading={isLoading} isError={isError} refetch={refetch} />
    );
  }
  return <ItemsForm controls={controls} item_categories={item_categories} />;
};

export default ItemsWithQuery;
