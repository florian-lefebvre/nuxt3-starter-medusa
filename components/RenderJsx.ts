import { PropType, VNode } from "vue";

export default defineComponent({
    props: {
        render: {
            type: Object as PropType<VNode>,
            required: true,
        },
    },
    setup(props) {
        return () => props.render;
    },
});
